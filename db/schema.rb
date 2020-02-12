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

ActiveRecord::Schema.define(version: 2020_02_12_001031) do

  create_table "actions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.bigint "device_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "parameter_name"
    t.string "parameter_value_8_pack"
    t.string "parameter_value_12_pack"
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

  create_table "devices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
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

  create_table "oems", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "operator_admins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.boolean "deactivated", default: false
    t.bigint "oem_business_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oem_business_id"], name: "index_operator_admins_on_oem_business_id"
  end

  create_table "operators", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.boolean "deactivated", default: false
    t.bigint "oem_business_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oem_business_id"], name: "index_operators_on_oem_business_id"
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
    t.string "author"
    t.string "language"
    t.text "steps_order"
    t.bigint "oem_business_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oem_business_id"], name: "index_procedures_on_oem_business_id"
  end

  create_table "steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title"
    t.string "location"
    t.string "mode"
    t.text "note"
    t.integer "time"
    t.string "parameter_name"
    t.boolean "safety", default: false
    t.boolean "has_visual", default: false
    t.bigint "procedure_id"
    t.bigint "oem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "parameter_value_8_pack"
    t.string "parameter_value_12_pack"
    t.boolean "spoken"
    t.bigint "device_id"
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["roleable_type", "roleable_id"], name: "index_users_on_roleable_type_and_roleable_id"
  end

  add_foreign_key "actions", "devices"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "oem_businesses", "oems"
  add_foreign_key "operator_admins", "oem_businesses"
  add_foreign_key "operators", "oem_businesses"
  add_foreign_key "procedures", "oem_businesses"
  add_foreign_key "steps", "devices"
  add_foreign_key "steps", "oems"
  add_foreign_key "steps", "procedures"
end
