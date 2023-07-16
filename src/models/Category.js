/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const CategorySchema = (sequelize, DataTypes) => {
  const CategroyTable = sequelize.define('Category', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "\"name\" is required",
        }
      }
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
  });
  return CategroyTable;
};

module.exports = CategorySchema;