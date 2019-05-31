import React from "react";
import PropTypes from "prop-types";
import Momemt from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Momemt format="YYYY/MM/DD">{from}</Momemt> -{" "}
        {!to ? "now" : <Momemt format="YYYY/MM/DD">{to}</Momemt>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
};

export default ProfileExperience;
