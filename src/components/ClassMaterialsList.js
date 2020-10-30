import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TutorialDataService from '../services/tutorial';
import Tutorial from './Material';

ClassMaterialsList.propTypes = {};

export default function ClassMaterialsList(props) {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    let tus = [];

    items.forEach((item, i) => {
      let key = item.data().key;
      let title = item.data().title;
      let description = item.data().description;
      let published = item.data().published;
      // console.log("key");
      // console.log(item.data().key);
      // console.log("data");
      // console.log(item.data().title);

      tus.push({
        key: key,
        title: title,
        description: description,
        published: published,
      });
    });

    setTutorials(tus);
  };

  useEffect(() => {
    TutorialDataService.getAll().then((snapshot) => {
      console.log('데이터 가져옴');
      console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs);
    });
  }, []);

  const refreshList = () => {
    TutorialDataService.getAll().then((snapshot) => {
      console.log('데이터 가져옴');
      console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs);
    });

    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll();
    refreshList();
  };

  // console.log("currentTuRkey");
  // console.log(currentTutorial.key);
  return (
    <div className="list row">
      <div className="col-md-6">
        <h4 className="d-flex align-items-center justify-content-center">
          내 강의
        </h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Course...</p>
          </div>
        )}
      </div>
    </div>
  );
}
