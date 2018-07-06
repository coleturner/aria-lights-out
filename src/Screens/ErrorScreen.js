import React from 'react';

export default function ErrorScreen(props) {
  return (
    <div className="Error-container Screen-center">
      <h2>Uh oh!</h2>
      <p>
        Something went wrong - this is a dead end. To continue, try refreshing
        the page.
      </p>
    </div>
  );
}
