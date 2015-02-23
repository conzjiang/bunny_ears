(function (root) {
  var isEmpty, disable, enable, Admin, Editable, ImageForm, TvShow;

  isEmpty = BunnyEars.Utils.isEmpty;
  disable = BunnyEars.Utils.disable;
  enable = BunnyEars.Utils.enable;
  Admin = BunnyEars.Admin;
  Editable = Admin.Editable;
  ImageForm = Admin.ImageForm;

  TvShow = Admin.TvShow = React.createClass({
    getInitialState: function () {
      return { show: {}, image_url: "" };
    },

    componentDidMount: function () {
      this.setState({
        show: this.props.show,
        image_url: this.props.show.image_url
      });
    },

    render: function () {
      // componentDidMount to run only after show is fetched
      var editable;
      if (!isEmpty(this.state.show)) {
        editable = <Editable show={this.state.show} />;
      }

      return (
        <li className="group">
          {this.imageTag()}

          <article className="content">
            {editable}
            <ImageForm setImage={this.setImage} />
            <button onClick={this.getInfo}>Get Info</button>
            <button className="delete" onClick={this.deleteTv}>Delete</button>
          </article>
        </li>
      );
    },

    imageTag: function () {
      var imageUrl;

      if (imageUrl = this.state.image_url) {
        return <img src={imageUrl} />;
      } else {
        return <div className="block"></div>;
      }
    },

    setImage: function (imageUrl) {
      var imageData = {};
      imageData[this.props.show.id] = imageUrl;
      this.props.collect(imageData);
      this.setState({ image_url: imageUrl });
    },

    getInfo: function (e) {
      var button = e.target;

      disable(button, "Fetching...");

      $.ajax({
        type: "get",
        url: "http://www.omdbapi.com",
        data: {
          t: this.state.show.title,
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
          enable(button, "Get Info");
        }.bind(this)
      });
    },

    setAttrs: function (data) {
      var show = this.props.show,
          years = data.Year.split("–");

      $.extend(show, {
        start_year: years[0],
        end_year: years[1],
        description: data.Plot,
        openEdit: true
      });

      this.setState({ show: show });
    },

    deleteTv: function () {
      $.ajax({
        type: "delete",
        url: "admin/tv_shows/" + this.props.show.id,
        dataType: "json",
        success: function () {
          this.props.deleteFromList(this.props.show);
        }.bind(this)
      });
    }
  });
})(this);
