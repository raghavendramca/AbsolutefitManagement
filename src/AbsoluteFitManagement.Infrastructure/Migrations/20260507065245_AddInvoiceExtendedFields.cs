using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbsoluteFitManagement.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddInvoiceExtendedFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DiscountReason",
                table: "Invoices",
                type: "TEXT",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InternalNotes",
                table: "Invoices",
                type: "TEXT",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceType",
                table: "Invoices",
                type: "TEXT",
                maxLength: 20,
                nullable: false,
                defaultValue: "Service");

            migrationBuilder.AddColumn<decimal>(
                name: "PaidAmount",
                table: "Invoices",
                type: "TEXT",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "PaymentsJson",
                table: "Invoices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SalesRepName",
                table: "Invoices",
                type: "TEXT",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "InvoiceItems",
                type: "TEXT",
                precision: 12,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "DiscountType",
                table: "InvoiceItems",
                type: "TEXT",
                maxLength: 10,
                nullable: false,
                defaultValue: "%");

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "InvoiceItems",
                type: "TEXT",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpiryDate",
                table: "InvoiceItems",
                type: "TEXT",
                maxLength: 30,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSessions",
                table: "InvoiceItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SacCode",
                table: "InvoiceItems",
                type: "TEXT",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartDate",
                table: "InvoiceItems",
                type: "TEXT",
                maxLength: 30,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(name: "DiscountReason",  table: "Invoices");
            migrationBuilder.DropColumn(name: "InternalNotes",   table: "Invoices");
            migrationBuilder.DropColumn(name: "InvoiceType",     table: "Invoices");
            migrationBuilder.DropColumn(name: "PaidAmount",      table: "Invoices");
            migrationBuilder.DropColumn(name: "PaymentsJson",    table: "Invoices");
            migrationBuilder.DropColumn(name: "SalesRepName",    table: "Invoices");

            migrationBuilder.DropColumn(name: "Discount",          table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "DiscountType",      table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "Duration",          table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "ExpiryDate",        table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "NumberOfSessions",  table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "SacCode",           table: "InvoiceItems");
            migrationBuilder.DropColumn(name: "StartDate",         table: "InvoiceItems");
        }
    }
}
