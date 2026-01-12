/*
	List:
		- the brand and model of cars
		- include the name of the seller,
		- the city they work in
		- the date of the sale
	
	Format the sold_date as DD-MM-YYYY using TO_CHAR()
	
	Use sold_cars as the left table and join other tables
		show sold_cars when we have no record of the seller
*/

/*
select 
s.name, s.role, d.city 
from staff s
full join dealerships d on s.dealership_id = d.id
where s.role = "Salesperson"
*/

/*
Can you get me a list of sold cars with the seller's name, city 
and the data of the sale
*/

/*
c = cars
sc = sold_cars
s = staff
d = dealership
*/

select sc.cars_id, c.brand, c.model, s.name as seller_name, d.city, sc.sold_date
from cars c
full join sold_cars sc on c.id = sc.cars_id
full join staff s on sc.seller = s.id
full join dealerships d on s.dealership_id = d.id
where s.role = 'Salesperson'