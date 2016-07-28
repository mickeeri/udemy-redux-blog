import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/';
import { Link } from 'react-router';

class PostsNew extends Component {
  // Check all parents to find React router.
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.formCtrlClassName = this.formCtrlClassName.bind(this);
    this.formGroupClassName = this.formGroupClassName.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  formCtrlClassName(field) {
    const cssClass = 'form-control';
    if (field.touched && field.invalid) {
      return `${cssClass} form-control-danger`;
    } else if (field.touched) {
      return `${cssClass} form-control-success`;
    }
    return cssClass;
  }

  formGroupClassName(field) {
    const cssClass = 'form-group';
    if (field.touched && field.invalid) {
      return `${cssClass} has-danger`;
    } else if (field.touched) {
      return `${cssClass} has-success`;
    }
    return cssClass;
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create new post</h3>

        <div className={this.formGroupClassName(title)}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className={this.formCtrlClassName(title)} {...title} />
          <div className="form-control-feedback">{title.touched ? title.error : ''}</div>
        </div>

        <div className={this.formGroupClassName(categories)}>
          <label htmlFor="categories">Categories</label>
          <input name="categories" type="text" className={this.formCtrlClassName(categories)} {...categories} />
          <div className="form-control-feedback">{categories.touched ? categories.error : ''}</div>
        </div>

        <div className={this.formGroupClassName(content)}>
          <label htmlFor="content">Content</label>
          <textarea name="content" type="text" className={this.formCtrlClassName(content)} {...content} />
          <div className="form-control-feedback">{content.touched ? content.error : ''}</div>
        </div>

        <div className="pull-xs-right action">
          <Link to="/" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

PostsNew.propTypes = {
  createPost: PropTypes.func.isRequired,
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }


  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate,
}, null, { createPost })(PostsNew);
