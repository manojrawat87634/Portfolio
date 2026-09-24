import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

export interface OverlayProps {
    isItemOpen: boolean;
    setIsItemOpen: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
}

const Overlay: React.FC<OverlayProps> = ({ setIsItemOpen, isItemOpen }) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState < boolean > (isItemOpen);

    // Sync the state with the parent
    useEffect(() => {
        setIsOverlayOpen(isItemOpen);
    }, [isItemOpen]);

    return (
        <div
            className={`${isOverlayOpen ? "" : "hidden"}`}
            onClick={() => {
                setIsOverlayOpen(false);
                setIsItemOpen(false); // Close the overlay when clicked
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 999, // Ensure it appears above other content
            }}
        />
    );
};

export default Overlay;