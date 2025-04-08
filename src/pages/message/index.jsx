import React, { useEffect, useState } from 'react'

import RenewalTemplate from './renewal_template';
import { useLocation, useParams } from 'react-router-dom';
import CheckListTemplate from './check_list_template';
import NotAttendedListTemplate from './not_attended_list_template';

export default function Message() {
    
    const { pathname } = useLocation();
    const { template } = useParams();

    const [recentTemplate, setRecentTemplate] = useState("renewal");

    useEffect(() => {
        if (template) {
            setRecentTemplate(template)
        } else {
            setRecentTemplate(localStorage.getItem('recent_template'))
        }
    }, [pathname, template])
    
    return (
        <div>
            <p className='text-primary font-bold text-xl mb-10'>Send Message</p>

            { recentTemplate == "renewal" && <RenewalTemplate /> }

            { recentTemplate == "checklist" && <CheckListTemplate /> }

            { recentTemplate == "notattendedlist" && <NotAttendedListTemplate /> }
        </div>
    )
}
