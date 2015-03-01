class CreateEarmarkings < ActiveRecord::Migration
  def change
    create_table :earmarkings do |t|
      t.integer :earmark_id
      t.integer :tv_show_id
      t.timestamps
    end

    add_index :earmarkings, :earmark_id
    add_index :earmarkings, :tv_show_id
  end
end
