import {ClientStorage} from "../../models/ClientStorage";
import {OM} from "../../code/General/ObjectManager";
import * as _ from "lodash";

new ValidatedMethod({
                      name: "client.trigger_realtime",
                      validate: function (data) {
    
                      },
                      run: function (data) {
                        let getClientStorageModel = (): ClientStorage => OM.create<ClientStorage>(ClientStorage);
    
                        if (data.hasOwnProperty('license')) {
                          let clientStorageModel: ClientStorage = getClientStorageModel();
                          clientStorageModel.addData(data)
                                            .save();
                        } else if (data.hasOwnProperty('batch')) {
                          _.forEach(data['batch'], datum => {
                            let clientStorageModel: ClientStorage = getClientStorageModel();
                            clientStorageModel.addData(datum)
                                              .save();
                          });
                        }
                      }
                    });
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "client.trigger_realtime",
                       }, 3, 1000);
