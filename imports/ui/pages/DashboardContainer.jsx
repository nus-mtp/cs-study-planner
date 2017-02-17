import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getPlannerIDs } from '../../api/crud-controller/planner/methods';
import Dashboard from './Dashboard';

export default DashboardContainer = createContainer(() => {
    Meteor.subscribe('planner');
    const userID = '9f91pejfj912ras';
    const plannerIDs = getPlannerIDs(userID);

    return { plannerIDs };
}, Dashboard);