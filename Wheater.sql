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




