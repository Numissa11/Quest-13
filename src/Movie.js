import React from 'react';

class  Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster: '',
      comment: '',
    };
  }

  onChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
         
    });
  
  };

  submitForm = (event) => {
    event.preventDefault();
    const url = `https://post-a-form.herokuapp.com/api/movies`;

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };

    console.log(config.body);
    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          console.log(res);
          alert(`Your movie: ${res.title}, has been successfully added!`);
          this.setState({
            title: '',
            poster: '',
            comment: '',
          });
        }
      })
      .catch((event) => {
        console.error(event);
        alert(
          'Oopsi, an error occured, we cannot add your movie :( ).',
        );
      });
  };

  render() {
    return (
      <div>
        <div className="Movie">
          <h1>Your Favorite movie</h1>

          <form onSubmit={this.submitForm}>
            <fieldset className="fieldset">
              <div className="form-data">
                <label className="label-one" htmlFor="title">
                  Movie's name
                </label>
               
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Please, enter the movie's name..."
                  onChange={this.onChange}
                  value={this.state.title}
                  required
                 
                />
              </div>

              <div className="form-data">
                <label className="label-one" htmlFor="poster">
                  Poster Link
                </label>
                <input
                  type="text"
                  id="poster"
                  name="poster"
                  placeholder="Please, enter the movie's url..."
                  onChange={this.onChange}
                  value={this.state.poster}
                  required
                />
              </div>

              <div className="form-data comment">
                <div>
                  <label className="label-two" htmlFor="comment">
                    Can you tell us Why is it your favorite movie? 
                  </label>
                </div>
                <div>
                  <textarea
                    rows="7"
                    cols="55"
                    className="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Please, leave your comment here..."
                    onChange={this.onChange}
                    value={this.state.comment}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="form-data">
                <input type="submit" value="Send" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Movie;