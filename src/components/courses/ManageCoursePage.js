import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadEmployers } from "../../redux/actions/employerActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  employers,
  loadEmployers,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (employers.length === 0) {
      loadEmployers().catch(error => {
        alert("Loading Employers failed" + error);
      });
    }
  }, [props.course], [props.employer]);

  function handleChange(event) {
    const { name, value} = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      employers={employers}
      onChange={handleChange}
      onSave={handleSave}
    />
  );

}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  employers: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadEmployers: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}


function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    courses:  state.employers.length === 0
        ? []
        : state.courses.map(course => {
      return {
        ...course,
        authorName: state.employers.find(a => a.id === course.authorId).name,
      };
    }),
    employers: state.employers,
    course,

  };
}

const mapDispatchToProps = {
  loadCourses,
  loadEmployers,
  // saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
