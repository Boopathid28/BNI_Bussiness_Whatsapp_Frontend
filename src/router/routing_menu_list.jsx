import Dashboard from "../pages/dashboard";
import Groups from "../pages/groups";
import Message from "../pages/message";
import MessageTemplates from "../pages/message_templates";

export const AuthenticationRoutes = [
    {
        path: '/',
        component: <Dashboard />
    },
    {
        path: '/groups',
        component: <Groups />
    },
    {
        path: '/messages',
        component: <Message />
    },
    {
        path: '/messages/:template',
        component: <Message />
    },
    {
        path: '/message-templates',
        component: <MessageTemplates />
    },
]