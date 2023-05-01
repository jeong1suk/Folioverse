import { Link } from "react-router-dom";

function Slide({ profileImg, name, email, description, url }) {
  return (
    <Link>
      <div>
        <img className="Profile" src={profileImg} alt="Profile" />
        <h4>
          {name}({email})
        </h4>
        <h5>{description}</h5>
      </div>
    </Link>
  );
}

export default Slide;
