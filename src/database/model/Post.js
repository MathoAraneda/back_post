export default (sequelize, DataTypes) => {
    const TB_POST = sequelize.define('tb_post',
    {
        idpost: { type: DataTypes.BIGINT, primaryKey:true, allowNull: false, autoIncrement: true,  },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false }
    },{
        tableName: "tb_post",
        timestamps: false,        // createdAt, updatedAt
        paranoid: true,          // Soft deletes (deletedAt)
        underscored: true,       // snake_case columns
        schema: "public"           // Esquema de la base de datos
    });


    return TB_POST;
}