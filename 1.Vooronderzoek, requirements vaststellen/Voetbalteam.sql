alter table spelers add column geslacht char(1) null 
check(geslacht = "v" or geslacht = "m");

show create table spelers;

update spelers set geslacht = "m";

insert into spelers(Sp_id, naam) values(7, 'Kees');
delete from spelers where Sp_id in (7);
delete from spelers where naam in ('Kees');

create table ttt (
/* gebruik auto increment voor id toe te voegen*/
id int auto_increment,
naam varchar(16),
primary key (id)
);

insert into ttt(naam) values('kees');

insert into ttt(naam) values('koos');

/*Sub qwery draaien*/
select * from spelers
where geboorte_datum = (
/*zoek de ouste speler*/
select min(geboorte_datum) from spelers);

select naam from spelers
where Sp_id in (
select aanvoerder_id from teams);

select naam from spelers
where Sp_id not in (
select aanvoerder_id from teams);

-- toon 0 - 0 wedstrijden
select score from wedstrijd
where wedstrijd_id not in (
select wedstrijd_id from doelpunt);

create user 'dev_user1'@'localhost'identified by 'dev_user1pass';
create user 'read_user1'@'localhost'identified by 'read_user1pass';
create user 'read_user2'@'localhost'identified by 'dev_user2pass';
create user 'jr_user1'@'localhost'identified by 'jr_user1pass';

-- show users
select host, user from mysql.user;
select * from mysql.user where user like '%user%';

-- create role
create role 'app_developer', 'app_read', 'app_write';

-- give permissions to roles
grant all on novi_bootcamp.* to 'app_developer';
grant select on novi_bootcamp.* to'app_read';
grant insert, update, delete on novi_bootcamp.* to 'app-write';

-- link users to roles


select current_user;

use novi_bootcamp;
select * from spelers;

update spelers set salaris = 40000
