import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClassMaterialDataService from '../services/classmaterial';
import UpdateClassMaterial from './UpdateClassMaterial';

ClassMaterialsList.propTypes = {};

export default function ClassMaterialsList(props) {
  const [classMaterials, setClassMaterials] = useState([]);
  const [currentClassMaterial, setCurrentClassMaterial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    let tus = [];

    items.forEach((item, i) => {
      let key = item.data().key;
      let title = item.data().title;
      let description = item.data().description;
      // console.log("key");
      // console.log(item.data().key);
      // console.log("data");
      // console.log(item.data().title);

      tus.push({
        key: key,
        title: title,
        description: description,
      });
    });

    setClassMaterials(tus);
  };

  useEffect(() => {
    ClassMaterialDataService.getAll().then((snapshot) => {
      console.log('데이터 가져옴');
      console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs);
    });
  }, []);

  const refreshList = () => {
    ClassMaterialDataService.getAll().then((snapshot) => {
      console.log('데이터 가져옴');
      console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs);
    });

    setCurrentClassMaterial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentClassMaterial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    ClassMaterialDataService.deleteAll();
    refreshList();
  };

  // console.log("currentTuRkey");
  // console.log(currentTutorial.key);
  return (
    <div className="list row">
      <div className="col-md-12">
        <h5 className="d-flex align-items-center justify-content-center">
          강의 자료
        </h5>

        <ul className="list-group">
          {classMaterials &&
            classMaterials.map((tutorial, index) => (
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
        {currentClassMaterial ? (
          <UpdateClassMaterial
            tutorial={currentClassMaterial}
            refreshList={refreshList}
          />
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
