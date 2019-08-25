FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/test_image.png")}
    user
    group
  end
end