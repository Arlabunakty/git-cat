import React from "react";
import "./About.css";

const fields = [
  { name: "bio", propertyName: "bio" },
  { name: "country", propertyName: "location" },
  { name: "company", propertyName: "company" },
  { name: "email", propertyName: "email" },
  { name: "profile", propertyName: "html_url", link: true },
  { name: "subscriptions", propertyName: "subscriptions_url", link: true },
  { name: "received events", propertyName: "received_events_url", link: true },
  { name: "repos", propertyName: "repos_url", link: true },
  { name: "followers", propertyName: "followers_url", link: true },
];

class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <img
          className="about-avatar"
          src={this.props.user.avatar_url}
          alt="avatar"
        />
        <div className="about-text">
          <h1>{this.props.user.name}</h1>
          <h3 className="account-details">ACCOUNT DETAILS</h3>
          {fields.map((f) => (
            <span key={f.name}>
              <b>{f.name}: </b>
              {f.link ? (
                <a href={this.props.user[f.propertyName]}>link</a>
              ) : (
                this.props.user[f.propertyName]
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default About;
