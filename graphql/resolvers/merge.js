const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const events = async eventIds => {
    console.log('dddd')
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    console.log("s")
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    console.log("ssss", userId)
    try {
        const user = await User.findById(userId);
        console.log(user)
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

const transformEvent = event => {
    console.log('ddd', event)
    return {
        ...event,
        _id: event.id,
        title: event.title,
        date: dateToString(event.date),
        creator: user.bind(this, event.creator)
    };
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;