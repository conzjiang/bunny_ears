# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150309021100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tv_shows", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "tmdb_id"
    t.integer  "start_year"
    t.integer  "end_year"
    t.text     "description"
  end

  create_table "users", force: true do |t|
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "watchlists", force: true do |t|
    t.integer  "watcher_id"
    t.integer  "tv_show_id"
    t.integer  "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "watchlists", ["tv_show_id"], name: "index_watchlists_on_tv_show_id", using: :btree
  add_index "watchlists", ["watcher_id", "tv_show_id"], name: "index_watchlists_on_watcher_id_and_tv_show_id", unique: true, using: :btree
  add_index "watchlists", ["watcher_id"], name: "index_watchlists_on_watcher_id", using: :btree

end
