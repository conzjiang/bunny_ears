class CreateEarmarks < ActiveRecord::Migration
  def change
    create_table :earmarks do |t|
      t.string :name
      t.timestamps
    end

    add_index :earmarks, :name
  end
end
