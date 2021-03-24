import React from 'react';
 
const Terms = (props) => {
    return (
        (
            <div style={{
              padding:"5% 0"
            }}>
              <input
                type="checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "20px",
                }}
                checked={props.checked}
                onChange={props.onChange}
              />
              <label
                style={{
                  fontSize: "20px",
                  color: "rgb(132, 0, 255)",
                }}
              >
                I agree to the{" "}
                <a
                  href="/"
                  style={{
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  Terms of service
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  style={{
                    color: "red",
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </a>
              </label>
              {props.AgreedError ? (
                <p
                  style={{
                    color: "red",
                  }}
                >
                  You must Agree on The Terms before Signing Up
                </p>
              ) : null}
            </div>
          )
    );
}
 
export default Terms