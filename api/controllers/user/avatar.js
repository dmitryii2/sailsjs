module.exports = {


  friendlyName: 'Avatar',


  description: 'Avatar user.',

  files: ['image'],

  inputs: {
    image: {
      type: 'ref',
      required: true,
    },
  },


  exits: {
    serverError: {
      responseType: 'serverError',
    },
    badRequest: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    const availableMimeTypes = ['image/png', 'image/jpeg'];
    if (_.isEmpty(inputs.image._files)) {
      throw { badRequest: '"file" is required, but it was not defined.' };
    }
    const fileMimeType = inputs.image._files[0].stream.headers['content-type'];
    if (availableMimeTypes.includes(fileMimeType)) {
      const { id } = await sails.helpers.user(this.req);
      inputs.image.upload({
        maxBytes: 10000000,
      }, (err, uploadedFiles) => {
        Users.updateOne({ id }).set({ avatar: uploadedFiles[0].filename })
          .exec((dbErr) => {
            if (dbErr) {
              return exits.serverError(dbErr);
            }
            return exits.success({ success: true });
          })
      });
    } else {
      throw { badRequest: '"file" must be an image (.jpg, .png)' };
    }

  }


};
