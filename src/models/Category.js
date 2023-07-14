/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const CAtegorySchema = (sequelize, DataTypes) => {
  const CategroyTable = sequelize.define('Category', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
  });
  return CategroyTable;
};

module.exports = CAtegorySchema;