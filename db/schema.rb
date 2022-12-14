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

ActiveRecord::Schema.define(version: 2020_11_25_144442) do

  create_table "action_copies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "step_id"
    t.bigint "action_id"
    t.string "parameter_value_8_pack"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mode"
    t.integer "time"
    t.index ["action_id"], name: "index_action_copies_on_action_id"
    t.index ["step_id"], name: "index_action_copies_on_step_id"
  end

  create_table "actions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.bigint "device_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "parameter_value_8_pack"
    t.string "parameter_value_12_pack"
    t.boolean "default"
    t.string "mode"
    t.integer "time"
    t.integer "parent_id"
    t.index ["device_id"], name: "index_actions_on_device_id"
  end

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "authors", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.boolean "deactivated", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "client_admins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.bigint "oem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oem_id"], name: "index_client_admins_on_oem_id"
  end

  create_table "comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "author_id"
    t.text "text"
    t.boolean "readed"
    t.bigint "step_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["step_id"], name: "index_comments_on_step_id"
  end

  create_table "devices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "default"
    t.bigint "procedure_id"
    t.text "actions_order"
    t.integer "parent_id"
    t.string "machine_tag"
    t.index ["procedure_id"], name: "index_devices_on_procedure_id"
  end

  create_table "languages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "abbreviation"
    t.string "default_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "oem_businesses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.bigint "oem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oem_id"], name: "index_oem_businesses_on_oem_id"
  end

  create_table "oem_businesses_authors", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "oem_business_id"
    t.bigint "author_id"
    t.index ["author_id"], name: "index_oem_businesses_authors_on_author_id"
    t.index ["oem_business_id"], name: "index_oem_businesses_authors_on_oem_business_id"
  end

  create_table "oem_businesses_operators", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "oem_business_id"
    t.bigint "operator_id"
    t.index ["oem_business_id"], name: "index_oem_businesses_operators_on_oem_business_id"
    t.index ["operator_id"], name: "index_oem_businesses_operators_on_operator_id"
  end

  create_table "oem_businesses_procedures", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "oem_business_id"
    t.bigint "procedure_id"
    t.index ["oem_business_id"], name: "index_oem_businesses_procedures_on_oem_business_id"
    t.index ["procedure_id"], name: "index_oem_businesses_procedures_on_procedure_id"
  end

  create_table "oems", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "procedures_limit", precision: 10
  end

  create_table "operations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "operator_id"
    t.bigint "procedure_id"
    t.datetime "last_used"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operator_id"], name: "index_operations_on_operator_id"
    t.index ["procedure_id"], name: "index_operations_on_procedure_id"
  end

  create_table "operators", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.boolean "deactivated", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "parlaty_admins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "procedures", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.float "version"
    t.text "description"
    t.string "category"
    t.text "steps_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "language_id"
    t.string "author"
  end

  create_table "steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.text "location"
    t.string "mode"
    t.text "note"
    t.integer "time"
    t.boolean "safety", default: false
    t.boolean "has_visual", default: false
    t.bigint "procedure_id"
    t.bigint "oem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "spoken"
    t.bigint "device_id"
    t.integer "loop_value", default: 1
    t.boolean "enabled_loop", default: false
    t.integer "steps_in_loop", default: 1
    t.integer "default_media", default: -1
    t.integer "associated_procedure_id"
    t.boolean "enabled_associated_procedure", default: false
    t.index ["device_id"], name: "index_steps_on_device_id"
    t.index ["oem_id"], name: "index_steps_on_oem_id"
    t.index ["procedure_id"], name: "index_steps_on_procedure_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "roleable_type"
    t.bigint "roleable_id"
    t.string "language"
    t.string "voice"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["roleable_type", "roleable_id"], name: "index_users_on_roleable_type_and_roleable_id"
  end

  add_foreign_key "action_copies", "actions"
  add_foreign_key "action_copies", "steps"
  add_foreign_key "actions", "devices"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "client_admins", "oems"
  add_foreign_key "comments", "steps"
  add_foreign_key "devices", "procedures"
  add_foreign_key "oem_businesses", "oems"
  add_foreign_key "steps", "devices"
  add_foreign_key "steps", "oems"
  add_foreign_key "steps", "procedures"
end
