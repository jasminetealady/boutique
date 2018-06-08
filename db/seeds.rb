# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

seed_data = [
  {name: "Mokara Candle", price: 30.00, description: "Mokara: Notes of Mokara Orchid, White Lily, Spring Moss. Our classic embossed glass jar design and proprietary coconut wax blend get an update with discerning Japanese inspiration. Beautiful hues glimmer as the flame illuminates delicate embossing. You’ll love using the jar for jewelry, flowers or decor long after the candle is gone. Burn time is approximately 100 hours.", picture: "mokara-candle.jpg"},
{name: "Vintner's Daughter", price: 180.00, description: "Active Botanical Serum is a 100% active face oil, strategically formulated to have the multi-correctional activity and penetration of a super-powered serum. Made from the world’s most nutrient rich botanicals and essential oils, it is a skincare game changer that restores skin’s balance, texture and natural radiance.", picture: "vintners-daughter.jpg"},
{name: "Rose Gold Safety Razor", price: 75.00, description: "What does shaving look like when it's made for women? This. A blade engineered to be irritation free. A tool that's balanced and weighted to make shaving a pleasure. A safety razor that is built to last. This is for curves and angles. This is for the girls who want to show up for their lives- minus the razor burn. We've got you, and your legs, covered.", picture: "oui-shave-razor.jpg"},
{name: "Anti-Pollution Hydra Defense Mist", price: 28.00, description: "Shields against city living, pollution and external aggressors, and protects, hydrates and detoxifies skin at the same time.", picture: "patyka-hydra-defense-anti-pollution-mist.jpg"}
]

seed_data.each{|i| Item.create(i)}
