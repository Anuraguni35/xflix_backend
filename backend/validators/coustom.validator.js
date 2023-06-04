const objectId = (value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return error;
    }
    return value;
  };


  module.exports = {
    objectId,
 
  };