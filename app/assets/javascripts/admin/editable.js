(function () {
  var isEmpty, Admin, Editable;

  isEmpty = BunnyEars.Utils.isEmpty;
  Admin = BunnyEars.Admin;

  Editable = Admin.Editable = React.createClass({
    getInitialState: function () {
      return { editing: false };
    },

    componentDidMount: function () {
      this.setState({
        title: this.props.show.title,
        start_year: this.props.show.start_year,
        end_year: this.props.show.end_year,
        description: this.props.show.description
      });
    },

    render: function () {
      return (
        <form onSubmit={this.save}>
          {this.title()}
          {this.years()}
          {this.description()}
        </form>
      );
    },

    title: function () {
      if (this.state.editing === "title") {
        return (
          <input type="text"
                 className="title"
                 value={this.state.title}
                 onChange={this.updateInput}
                 onBlur={this.save} />
        );
      } else {
        return <strong onDoubleClick={this.edit}
                       className="title">{this.state.title}</strong>;
      }
    },

    years: function () {
      if (this.state.editing === "years") {
        var separator = "-";
        return (
          <div>
            <input type="number"
                   className="start_year"
                   value={this.state.start_year}
                   onChange={this.updateInput}
                   onBlur={this.save} />
           {separator}
            <input type="number"
                   className="end_year"
                   value={this.state.end_year}
                   onChange={this.updateInput}
                   onBlur={this.save} />
          </div>
        );
      } else {
        return (
          <strong onDoubleClick={this.edit}
                  className="years">
            {this.state.start_year || "start"} - {this.state.end_year || "end"}
          </strong>
        );
      }
    },

    description: function () {
      if (this.state.editing === "description" || this.props.show.openEdit) {
        delete this.props.show.openEdit;

        return (
          <textarea className="description"
                    value={this.state.description}
                    onChange={this.updateInput}
                    onBlur={this.save}>{this.state.description}</textarea>
        );
      } else {
        return (
          <p onDoubleClick={this.edit} className="description">
            {this.state.description || "description"}
          </p>
        );
      }
    },

    updateInput: function (e) {
      var state = {};
      state[e.target.className] = e.target.value;
      this.setState(state);
    },

    save: function (e) {
      var data, attr;
      e.preventDefault();

      data = {};
      attr = e.target.className;
      data[attr] = this.state[attr];

      if (!data[attr]) {
        this.setState({ editing: false });
        return;
      }

      $.ajax({
        type: "put",
        url: "admin/tv_shows/" + this.props.show.id,
        data: { tv_show: data },
        dataType: "json",
        success: function () {
          this.setState({ editing: false });
        }.bind(this)
      });
    },

    edit: function (e) {
      var className = e.target.className || e.target.parentElement.className;
      this.setState({ editing: className });

      setTimeout(function () {
        $("." + className).focus().select();
      }, 0);
    }
  });
})();