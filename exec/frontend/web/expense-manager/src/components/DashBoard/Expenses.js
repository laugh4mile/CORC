import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import { useHistory } from 'react-router-dom';
import React from 'react';
import PropTypes from '../../utils/propTypes';
import { Card, CardText, CardTitle, Progress } from 'reactstrap';
import Typography from '../Typography';
import classes from './Item.module.css';

const Expenses = (props) => {
  console.log('props', props);

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

  console.log('propsCC', props.color);

  // const value (used) => new props.info.used;
  return (
    <Card body>
      <div className="d-flex justify-content-between">
        {/* 선 투명 */}
        <CardText tag="div">
          <Typography className="mb-0">
            <strong>{props.title}</strong>
          </Typography>
        </CardText>
      </div>
      <br></br>
      <Progress
        // value={props.info.value}
        color={props.color}
        style={{ height: '8px' }}
      />
      <CardText tag="div" className="d-flex justify-content-between">
        <Typography tag="span" className="text-right text-muted small">
          {props.value}%
        </Typography>
      </CardText>
      <CardTitle className={`text-${props.color}`}>
        {formatMoney(props.info.notConfirmed)}
      </CardTitle>
    </Card>
  );
};

Expenses.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  color: PropTypes.oneOf(['primary']),
  progress: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
};

export default Expenses;
