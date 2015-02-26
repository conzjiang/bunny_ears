(function () {
  var isEmpty, Admin, Editable;

  isEmpty = BunnyEars.Utils.isEmpty;
  disable = BunnyEars.Utils.disable;
  enable = BunnyEars.Utils.enable;
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
          {this.getInfoButton()}
          <strong>{this.startYear()} {"-"} {this.endYear()}</strong>
          {this.description()}
        </form>
      );
    },

    title: function () {
      var title = this.state.title;

      if (this.state.editing === "title") {
        return (
          <input type="text"
                 ref="title"
                 className="title"
                 value={title}
                 onChange={this.updateInput}
                 onBlur={this.save} />
        );
      } else {
        return <strong onDoubleClick={this.edit}
                       className="title">{title}</strong>;
      }
    },

    getInfoButton: function () {
      if (!this.state.description) {
        return (
          <button type="button" onClick={this.getInfo}>Get Info</button>
        );
      }
    },

    startYear: function () {
      return this.year("start_year");
    },

    endYear: function () {
      return this.year("end_year");
    },

    year: function (year) {
      var stateYear = this.state[year];

      if (this.state.editing === year) {
        return (
          <input type="number"
                 ref={year}
                 className={year}
                 value={stateYear}
                 onChange={this.updateInput}
                 onBlur={this.save} />
        );
      } else {
        return (
          <span onDoubleClick={this.edit} className={year}>
            {stateYear || year.slice(0, year.length - 5)}
          </span>
        );
      }
    },

    description: function () {
      var description = this.state.description;

      if (this.state.editing === "description") {
        return (
          <textarea className="description"
                    ref="description"
                    value={description}
                    onChange={this.updateInput}
                    onBlur={this.save} />
        );
      } else {
        return (
          <p onDoubleClick={this.edit} className="description">
            {description || "description"}
          </p>
        );
      }
    },

    focusInput: function (ref) {
      setTimeout(function () {
        var node = this.refs[ref].getDOMNode();
        node.focus();
        node.select();
      }.bind(this), 0);
    },

    updateInput: function (e) {
      var state = {};
      state[e.target.className] = e.target.value;
      this.setState(state);
    },

    save: function (e) {
      e.preventDefault();

      $.ajax({
        type: "put",
        url: "admin/tv_shows/" + this.props.show.id,
        data: { tv_show: this.state },
        dataType: "json",
        success: function () {
          this.setState({ editing: false });
        }.bind(this)
      });
    },

    getInfo: function (e) {
      var button = e.target;
      disable(button, "Fetching...");

      $.ajax({
        type: "get",
        url: "https://www.omdbapi.com",
        data: {
          t: this.props.show.title,
          type: "series",
          plot: "short",
          r: "json"
        },
        dataType: "json",
        success: function (data) {
          if (data.Response === "False") {
            button.innerHTML = "Error :(";
            setTimeout(enable.bind(null, button, "Get Info"), 1000);
            return;
          }

          this.setAttrs(data);
          this.focusInput("description");
          enable(button, "Get Info");
        }.bind(this)
      });
    },

    setAttrs: function (data) {
      var show = this.props.show,
          years = data.Year.split("–");

      this.setState({
        start_year: years[0],
        end_year: years[1],
        description: data.Plot,
        editing: "description"
      });
    },

    edit: function (e) {
      var attr = e.target.className;
      this.setState({ editing: attr });
      this.focusInput(attr);
    }
  });
})();