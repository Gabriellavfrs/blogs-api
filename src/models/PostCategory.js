/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategoryTable.associate = ({BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategoryTable,
    });
    Category.belongsToMany(BlogPost, {
      as: 'blogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategoryTable,
    });
  };

  return PostCategoryTable;
};

module.exports = PostCategorySchema;