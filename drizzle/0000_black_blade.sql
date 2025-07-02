CREATE TYPE "public"."mediaType" AS ENUM('image', 'video');--> statement-breakpoint
CREATE TYPE "public"."methodPayment" AS ENUM('pix', 'cartao', 'boleto');--> statement-breakpoint
CREATE TYPE "public"."notificationType" AS ENUM('informação', 'aviso', 'erro');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."statusBlog" AS ENUM('rascunho', 'publicado', 'arquivado');--> statement-breakpoint
CREATE TYPE "public"."statusPayment" AS ENUM('pendente', 'pago', 'cancelado');--> statement-breakpoint
CREATE TYPE "public"."tags" AS ENUM('noticia', 'evento', 'artigo', 'outro');--> statement-breakpoint
CREATE TABLE "blog_post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"user_id" uuid NOT NULL,
	"status" "statusBlog" DEFAULT 'rascunho' NOT NULL,
	"tags" "tags"[] DEFAULT '{"noticia"}' NOT NULL,
	"featured" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"cover_id" uuid,
	"cover_url" varchar(500),
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" varchar(500) NOT NULL,
	"filename" varchar NOT NULL,
	"type" "mediaType" NOT NULL,
	"size" integer NOT NULL,
	"width" integer,
	"height" integer,
	"duration" integer DEFAULT 0,
	"location" varchar(500) DEFAULT '' NOT NULL,
	"alt" varchar(500) DEFAULT '',
	"caption" text,
	"is_public" boolean DEFAULT true,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"title" varchar(500) NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"type" "notificationType" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"amount" numeric(10, 2) NOT NULL,
	"status" "statusPayment" DEFAULT 'pendente' NOT NULL,
	"method" "methodPayment" NOT NULL,
	"donor_name" varchar(255),
	"donor_email" varchar(255),
	"is_recurring" boolean DEFAULT false,
	"transaction_id" varchar(255),
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"language" varchar(50) DEFAULT 'pt-BR' NOT NULL,
	"currency" varchar(50) DEFAULT 'BRL' NOT NULL,
	"timezone" varchar(50) DEFAULT 'America/Sao_Paulo' NOT NULL,
	"date_format" varchar(50) DEFAULT 'DD/MM/YYYY' NOT NULL,
	"time_format" varchar(50) DEFAULT 'HH:mm' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "roles" DEFAULT 'user' NOT NULL,
	"avatar_image" text,
	"phone" varchar(20),
	"bio" text,
	"position" varchar(100),
	"is_active" boolean DEFAULT true,
	"email_verified" boolean DEFAULT false,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;