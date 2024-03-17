using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class Cleanup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_DirectoryNodes_ParentDirectoryId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_ParentDirectoryId",
                table: "Documents");

            migrationBuilder.AddColumn<Guid>(
                name: "DirectoryNodeId",
                table: "Documents",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_DirectoryNodeId",
                table: "Documents",
                column: "DirectoryNodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_DirectoryNodes_DirectoryNodeId",
                table: "Documents",
                column: "DirectoryNodeId",
                principalTable: "DirectoryNodes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_DirectoryNodes_DirectoryNodeId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_DirectoryNodeId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "DirectoryNodeId",
                table: "Documents");

            migrationBuilder.CreateIndex(
                name: "IX_Documents_ParentDirectoryId",
                table: "Documents",
                column: "ParentDirectoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_DirectoryNodes_ParentDirectoryId",
                table: "Documents",
                column: "ParentDirectoryId",
                principalTable: "DirectoryNodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
