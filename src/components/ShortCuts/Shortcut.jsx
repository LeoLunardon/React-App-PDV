import React from "react";
import PropTypes from "prop-types";

const Shortcut = ({ link, title, onClick }) => {
  const ShortcutUrl = "http://localhost:5173";
  const fullUrl = `${ShortcutUrl}/${link}`;

  const handleClick = () => {
    // Lógica de navegação ou abertura de modal

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className=" border">
      <ul className="flex">
        <a href={fullUrl}>
          <li>{title}</li>
        </a>
      </ul>
    </div>
  );
};

Shortcut.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Shortcut;
