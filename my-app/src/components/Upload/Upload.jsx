import React from 'react';
import {bool, func, string} from 'prop-types';
import {StyledUpload} from './Upload.styled';

function UploadItemClicked(setOpen, setPage, previousPage, pageName) {
    if (previousPage !== pageName) {
        console.log("changing the page state");
        setPage(pageName);
    }
    setOpen(false);
}

// TODO clean this up with JSX for less redundancy
// TODO make these links change the page(👍) OR change to buttons(👎)
const Upload = ({open, setOpen, page, setPage}) => {
    return (
        <StyledUpload open={open}>
            <a href="#upload" onClick={() => {
                UploadItemClicked(setOpen, setPage, page, "Upload")
            }}>
                <span role="img" aria-label="activity">&#x1F4AA;</span>
                Upload
            </a>
            <a href="#activity" onClick={() => {
                UploadItemClicked(setOpen, setPage, page, "Activity")
            }}>
                <span role="img" aria-label="activity">&#x1F4AA;</span>
                Activity
            </a>
            <a href="#heart" onClick={() => {
                UploadItemClicked(setOpen, setPage, page, "Heart")
            }}>
                <span role="img" aria-label="heart">&#x1F49C;</span>
                Heart
            </a>
            <a href="#explore" onClick={() => {
                UploadItemClicked(setOpen, setPage, page, "Explore")
            }}>
                <span role="img" aria-label="explore">&#x1F4CA;</span>
                Explore
            </a>
        </StyledUpload>
    )
};

Upload.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
    page: string.isRequired,
    setPage: func.isRequired,
};

export default Upload;