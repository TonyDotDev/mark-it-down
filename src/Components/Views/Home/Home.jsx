import React, { useState, useRef, useEffect } from 'react';
import { TextareaAutosize, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FileCopy } from '@material-ui/icons';
import { toast } from 'react-toastify';

import demo from '../../../markdown/demo.md';
import pullRequest from '../../../markdown/pullRequest.md';
import Select from '../../Inputs/Select/Select';
import Logo from '../../../static/svg/logo.svg';
import MarkdownDisplay from '../../MarkdownDisplay/MarkdownDisplay';

const useStyles = makeStyles((theme) => ({
  clearButtonRoot: {
    marginLeft: 8,
    color: theme.palette.secondary.main,
    '&:hover': {
      background: 'transparent',
    },
  },
  clearButtonFocus: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.light,
  },
  undoButton: {},
}));

const toastOptions = { position: toast.POSITION.BOTTOM_LEFT };

const Home = () => {
  const [template, setTemplate] = useState(0);
  const [demoTemplate, setDemoTemplate] = useState('');
  const [pullRequestTemplate, setPullRequestTemplate] = useState('');
  const [inputValue, setInputValue] = useState(null);
  const classes = useStyles();
  const textAreaRef = useRef(null);

  const templateOptions = [
    {
      name: 'Select a template',
      value: 0,
      template: demoTemplate,
      disabled: true,
    },
    {
      name: 'None',
      value: 1,
      template: '',
    },
    {
      name: 'Demo',
      value: 2,
      template: demoTemplate,
    },
    {
      name: 'Pull Request',
      value: 3,
      template: pullRequestTemplate,
    },
  ];

  useEffect(() => {
    fetch(demo).then((res) =>
      res.text().then((text) => {
        setDemoTemplate(text);
        setInputValue(text);
      })
    );
    fetch(pullRequest).then((res) =>
      res.text().then((text) => {
        setPullRequestTemplate(text);
      })
    );
  }, []);

  const handleTextAreaChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setTemplate(value);
    setInputValue(templateOptions[value].template);
  };

  const clearInput = () => {
    const clearedTemplate = template;
    const clearedInput = inputValue;

    const handleUndo = () => {
      setTemplate(clearedTemplate);
      setInputValue(clearedInput);
    };

    setInputValue('');
    setTemplate(1);
    toast.error(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: 16,
        }}
      >
        Markdown cleared
        <span style={{ marginLeft: 8 }} aria-label="img" role="img">
          😮
        </span>
        <Button
          style={{ marginLeft: 'auto' }}
          variant="contained"
          onClick={handleUndo}
        >
          Undo
        </Button>
      </div>,
      toastOptions
    );
  };

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.currentTarget.focus();
    toast('Markdown copied 😎', toastOptions);
  };
  return (
    <Box
      component="div"
      minHeight="100vh"
      padding="80px 100px"
      width={1400}
      maxWidth="100%"
      margin="0 auto"
      backgroundColor="#aeaeae"
      display="flex"
      flexDirection="column"
    >
      <img
        style={{ margin: '0 auto 24px auto' }}
        src={Logo}
        alt="Mark-it-down logo"
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginBottom="16px"
      >
        <h2 style={{ marginBottom: 8, letterSpacing: '1.2px' }}>
          Would you like to start with a template?
        </h2>
        <Select
          onChange={handleSelectChange}
          value={template}
          items={templateOptions}
          placeholder="Select a template"
          helpText="This overwrite your markdown"
        />
      </Box>

      <Box margin="auto 0 24px 0">
        <Box display="flex" marginTop="24px">
          <Button
            onClick={copyToClipboard}
            startIcon={<FileCopy />}
            variant="contained"
          >
            Copy Markdown
          </Button>
          <Button
            classes={{
              root: classes.clearButtonRoot,
              focusVisible: classes.clearButtonFocus,
            }}
            onClick={clearInput}
            variant="simple"
          >
            Clear
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <TextareaAutosize
          placeholder="Enter markdown here..."
          value={inputValue}
          onChange={handleTextAreaChange}
          ref={textAreaRef}
          style={{
            width: '45%',
            height: '60vh',
            overflow: 'auto',
            padding: 24,
          }}
        />
        <MarkdownDisplay
          source={inputValue || 'And see your results here...'}
        />
      </Box>
    </Box>
  );
};

export default Home;
