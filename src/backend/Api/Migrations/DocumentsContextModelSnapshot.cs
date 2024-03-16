﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(DocumentsContext))]
    partial class DocumentsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.3");

            modelBuilder.Entity("Domain.Entities.DirectoryNode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ParentDirectoryId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ParentDirectoryId");

                    b.ToTable("DirectoryNodes", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.Document", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ParentDirectoryId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ParentDirectoryId");

                    b.ToTable("Documents", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.DirectoryNode", b =>
                {
                    b.HasOne("Domain.Entities.DirectoryNode", "ParentDirectory")
                        .WithMany("DirectoryNodes")
                        .HasForeignKey("ParentDirectoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ParentDirectory");
                });

            modelBuilder.Entity("Domain.Entities.Document", b =>
                {
                    b.HasOne("Domain.Entities.DirectoryNode", "ParentDirectory")
                        .WithMany("Documents")
                        .HasForeignKey("ParentDirectoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ParentDirectory");
                });

            modelBuilder.Entity("Domain.Entities.DirectoryNode", b =>
                {
                    b.Navigation("DirectoryNodes");

                    b.Navigation("Documents");
                });
#pragma warning restore 612, 618
        }
    }
}
