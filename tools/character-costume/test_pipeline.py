import unittest
from PIL import Image,ImageDraw
from build import pants,role
import json
from pathlib import Path

class PipelineTests(unittest.TestCase):
    def setUp(self):self.style=json.loads(Path(__file__).with_name('style.json').read_text())
    def test_rotated_leg_keeps_pants_and_boot(self):
        leg=Image.new('RGBA',(32,32));d=ImageDraw.Draw(leg);d.rectangle((13,7,16,22),fill='white');d.rectangle((13,22,20,24),fill='white')
        for turn,hip in [(0,(14,6)),(1,(6,17)),(2,(17,25)),(3,(25,14))]:
            im=leg.rotate(turn*90);out,cloth,stats=pants(im,hip,True,self.style)
            self.assertGreater(stats['covered_pixels'],0);self.assertGreater(stats['boot_pixels'],0)
            for y in range(32):
                for x in range(32):
                    if im.getpixel((x,y))[3]:self.assertEqual(out.getpixel((x,y))[3],255)
    def test_style_change_propagates_without_frame_edit(self):
        im=Image.new('RGBA',(24,24));ImageDraw.Draw(im).rectangle((7,2,14,21),fill='white')
        a=pants(im,(10,1),True,self.style)[1]
        self.style['palette']['pants']='#ff0000';b=pants(im,(10,1),True,self.style)[1]
        self.assertEqual(a.getchannel('A').tobytes(),b.getchannel('A').tobytes());self.assertNotEqual(a.tobytes(),b.tobytes())
    def test_aliases_and_unsupported_layers(self):
        self.assertEqual(role('Back leg'),'back_leg');self.assertEqual(role('Lead Leg'),'front_leg')
        self.assertEqual(role('Front Hand'),'front_arm');self.assertIsNone(role('Flattened'))

if __name__=='__main__':unittest.main()
