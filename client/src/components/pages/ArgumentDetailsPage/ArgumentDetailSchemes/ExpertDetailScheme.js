import React from 'react'

import CriticalQuestion from '../CriticalQuestion'
import {SCHEMES, QUESTIONS} from '../../../../constants/schemes';
import { ListGroup } from 'react-bootstrap';

class ExpertDetailScheme extends React.Component {
  state = {
    criticalQuestions: null
  }

  componentDidMount() {
    /* eslint-disable no-unused-vars */
    let { source, domain, assertion } = this.props.argument;
    let questionTags = SCHEMES.expert.criticalQuestions;

    let criticalQuestions = {};

    questionTags.forEach(tag => {
      const cq = QUESTIONS[tag];
      /* eslint-disable no-eval */
      cq.question = eval('`' + cq.question + '`');
      criticalQuestions[tag] = cq;
    });
    
    this.setState({criticalQuestions});
  }

  render() {
    let { criticalQuestions } = this.state;
    let { source, domain, assertion } = this.props.argument;

    return (
      <div>
        <div>
          <div>There is a source E: {source}</div>
          <div>Who is an expert in subject domain D: {domain}</div>
          <div>The source makes the assestion A that: {assertion}</div>
        </div>
        {this.props.showCriticalQuestions && criticalQuestions !== null?
          <div>
            <hr/>
            <h6>Critical Questions</h6>
            <ListGroup>
              {
                Object.keys(criticalQuestions).map(questionTag => {
                  const criticalQuestion = criticalQuestions[questionTag];
                  return (
                    <div key={criticalQuestion.question}>
                      <CriticalQuestion 
                        question={criticalQuestion.question} 
                        questionTag={questionTag}
                        {...this.props}
                      />
                    </div>
                  )
                })
              }
            </ListGroup>
          </div>
          : null
        }
      </div>
    );
  }
}

export default ExpertDetailScheme
