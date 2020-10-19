// local import
config = require('../config/');

ListProcessor = (function() {
  var available_orders;

  class ListProcessor {
    constructor() {}

    /**
    * Processes req for mongoose model condition options
    * @param {*} req - request to be sent
    * @return options formed as an object
    */
    process(params) {
      var options, sorts;
      options = {};
      options.pagination = {};
      
      // query limit
      if (params.limit) {
        options.pagination.limit = parseInt(params.limit);
      } else {
        options.pagination.limit = config.pagination.limit;
      }
      // query offset
      /*if (params.offset && !params.page) {
        options.pagination.skip = parseInt(params.offset);
      } else {
        options.pagination.skip = config.pagination.offset;
      }*/
      // query page
      if (params.page && !params.offset) {
        options.pagination.skip = parseInt((options.pagination.limit * params.page) - options.pagination.limit)
      } else {
        options.pagination.skip = parseInt((options.pagination.limit * 1) - options.pagination.limit)
      }
      // default sort order
      options.sort = {
        'updated_at': -1
      };
      // query sort
      if (params.sort) {
        options.sort = {};
        sorts = params.sort.toString().trim().split(',');
        sorts.forEach(function(val) {
          var sort;
          val = val.trim();
          sort = val.split('-');
          switch (sort[1].toString().toLowerCase()) {
            case "desc":
              return options.sort[sort[0].toString()] = -1;
            default:
              return options.sort[sort[0].toString()] = 1;
          }
        });
      }
      return options;
    }

  };

  available_orders = [1,
    -1 //  1 => ascending order sort
  ];

  return ListProcessor;

}).call(this);

module.exports = ListProcessor;