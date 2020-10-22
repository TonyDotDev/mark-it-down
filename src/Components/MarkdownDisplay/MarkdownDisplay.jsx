import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import renderers from 'react-markdown-github-renderers';
import gfm from 'remark-gfm';

const useStyles = makeStyles({
  displayRoot: {
    overflow: 'auto',
    background: '#fff',
  },
});

const MarkdownDisplay = ({ source }) => {
  const classes = useStyles();

  return (
    <Box
      component="div"
      width="45%"
      height="60vh"
      border="1px solid #333"
      borderRadius="2px"
      padding="24px"
      classes={{ root: classes.displayRoot }}
    >
      <ReactMarkdown renderers={renderers} plugins={[gfm]}>
        {source || 'And the results will show here...'}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownDisplay;
