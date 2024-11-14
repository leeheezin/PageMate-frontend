import React, { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
    <div>
    {children}
    </div>
    );
};

export default AppLayout;
