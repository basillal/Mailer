import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { Nav } from "./Nav";



import axios from 'axios';

export const Background = () => {
  const date = new Date();
  const [templates, setTemplates] = useState([]);


  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/fetch_email_templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching email templates:', error);
      }
    };
    fetchTemplates();
  }, []);

  const handleCardClick = (template) => {

    console.log(template);
  };



  return (
    <>
      <Nav />
      <div className="background">
        <div className="top">
          <div className="text">
            <h1>Mailer Template</h1>
          </div>
          <div className="right">
            <div className="date">
              <h1>{date.toLocaleDateString()}</h1>
            </div>
            <div className="attachment">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 32 33"
                  fill="none"
                >
                  <path
                    d="M17.6 14.85V8.25H14.4V14.85H8V18.15H14.4V24.75H17.6V18.15H24V14.85H17.6ZM16 33C11.7565 33 7.68687 31.2616 4.68629 28.1673C1.68571 25.0729 0 20.8761 0 16.5C0 12.1239 1.68571 7.92709 4.68629 4.83274C7.68687 1.73839 11.7565 0 16 0C20.2435 0 24.3131 1.73839 27.3137 4.83274C30.3143 7.92709 32 12.1239 32 16.5C32 20.8761 30.3143 25.0729 27.3137 28.1673C24.3131 31.2616 20.2435 33 16 33Z"
                    fill="#3D63F7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="card-flex">
          {templates.map((template) => (
            <Card key={template.id} template={template}
              onClick={() => handleCardClick(template)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
