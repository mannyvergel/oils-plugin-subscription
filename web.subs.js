const Subscription = web.models("SubsSubscription");
const Subscriber = web.models("SubsSubscriber");

module.exports = function() {
  var self = {};

  self.subscribe = subscribe;
  self.unsubscribe = unsubscribe;
  self.subscriptionCount = subscriptionCount;
  self.newSubscription = newSubscription;

  self.getSubscribers = getSubscribers;

  return self;
}


async function subscribe(subsId, userId) {
  let subs = await Subscription.findOne({subsId: subsId}).exec();
  if (!subs) {
    console.warn("[subscribe][SEVERE] Subscription not found! " + subsId);
    //still save, should be ok
  }

  let subscriber = await Subscriber.findOne({subsId: subsId, user: userId}).exec();
  if (!subscriber) {
    subscriber = new Subscriber({subsId: subsId, user: userId});
    await subscriber.save();
    console.log("Subscribed", subsId, userId);
  }
}

async function unsubscribe(subsId, userId) {
  let subs = await Subscription.findOne({subsId: subsId}).exec();
  if (!subs) {
    console.warn("[unsubscribe][SEVERE] Subscription not found! " + subsId);
    //still unsubscribe, should be ok
  }

  let subscriber = await Subscriber.findOne({subsId: subsId, user: userId}).exec();
  if (subscriber) {
    await subsriber.remove();
    console.log("Unsubscribed", subsId, userId);
  } else {
    console.warn("Already unsubscribed", subsId, userId);
  }
}

async function subscriptionCount(subsId) {
  let count = await Subscriber.find({subsId:subsId}).count();

  return count;
}

async function newSubscription(subsId, subsType, name, descrip) {
  let subs = new Subscription({subsId: subsId, subsType: subsType, name: name, descrip: descrip});

  await subs.save();
}

async function getSubscribers(subsId, exceptUserId, populate) {
  let params = {subsId: subsId};
  if (exceptUserId) {
    params.user = {$ne: exceptUserId}
  }

  let subscribers = await Subscriber.find(params).populate(populate).exec();

  return subscribers;
}