USE IRRIGA;
CREATE TABLE citie_wheather (
	id 			INT PRIMARY KEY serial default value 	NOT NULL,
    id_cities 	int  							NOT NULL,
	temp 		float							NOT NULL,
	temp_max 	float 							NOT NULL,
	temp_min 	float 							NOT NULL,
    wind_speed 	float 							NOT NULL,
    sunrise 	varchar(20) 					NOT NULL,
    sunset 		varchar(20) 					NOT NULL,
    rain 		long 							NOT NULL,
    time_stamp 	varchar(20) 							NOT NULL,

    FOREIGN KEY (id_cities) REFERENCES cities(id)
);

INSERT INTO citie_wheather 
VALUES ( 0,3,12.46,13,12.22,5.1,1590893814,1590950522,"undefined",1590887237);




SELECT *
from citie_wheather
