
import {Template} from 'meteor/templating';
import {upload_files} from 's3up/client';
import {ReactiveVar} from 'meteor/reactive-var';
import Dropzone from 'dropzone';

Template.afFileUpload.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);   
    this.errorUpload = new ReactiveVar(false);  
    this.linkImage = new ReactiveVar();   
});

Template.afFileUpload.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    },
    errorUpload() {
        return Template.instance().errorUpload.get();
    },
    schemaKey() {
        if (this.atts) {
            return this.atts['data-schema-key'];
        }
    },
    linkImage() {
        return Template.instance().linkImage.get();
    },
    existImage() {
        const newImage = Template.instance().linkImage.get();

        if (newImage) {
            return newImage;
        } else {
            return this.value;
        }
    }
});

Template.afFileUpload.onRendered(function() {
    let typeName = this.data.atts ? (this.data.atts.typeName || 'image') : 'image'; 
    this.dropzone = new Dropzone('#uploadFile', {
        autoDiscover: false,
        autoProcessQueue: false,
        uploadMultiple: false,
        clickable: '#uploadFile .uploadButton',
        url() {
            return 'https://fakeurl.com'
        }, 
        addedfile: (file) => {
            let type = file.type.split('/')[0];
            if (type == typeName) {
                this.currentUpload.set(true);
                this.errorUpload.set(false);
                const $fileUrl = $('#url');
                $fileUrl.val();
                upload_files([file], {
                    authorizer: Meteor.call.bind(this, 'authorize_upload'),
                    upload_event: (err, res) => {
                        if (err) {
                            this.errorUpload.set(err.reason);
                        }
                        $('#loading').progress({
                            percent: res.total_percent_uploaded
                        });
                        if (res.status == 'complete') {
                            this.currentUpload.set(false);
                            $fileUrl.val(res.secure_url);
                            this.linkImage.set(res.secure_url);
                        }
                    },
                    encoding: 'base64',
                });
            } else {
                this.errorUpload.set(`Type of file (${file.name}) is not an ${typeName}`);
            }

        }
    })
});

Template.afFileUpload.onDestroyed(function() {
    if(this.dropzone) {
        this.dropzone.destroy();
        this.dropzone = null;
    }
})