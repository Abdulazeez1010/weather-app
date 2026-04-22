import React from 'react';

type InfoCardProps = {
    children: React.ReactNode;
    className?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({children, className= ''}) => {
    return (
        <div className={`rounded-xl bg-[hsl(243,27%,20%)] p-4 text-white ${className}`}>
            {children}
        </div>
    );
};

export default InfoCard;